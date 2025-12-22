"use client";


import { useState, useMemo } from "react";
import { InputField } from "@/components/ui/InputField";
import { chainsToTSender, erc20Abi, tsenderAbi } from "@/constants";
import { useChainId, useConfig,useWriteContract,useWaitForTransactionReceipt, useConnect, useDisconnect,useReadContract } from 'wagmi';
import { waitForTransactionReceipt } from '@wagmi/core';
import { calculateTotal } from "@/utils";
import { CgSpinner } from "react-icons/cg";
import { isAddress } from 'viem';

export default function AirdropForm() {
  const [tokenAddress, setTokenAddress] = useState("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512");
  const [recipients, setRecipients] = useState("");
  const [amount, setAmount] = useState(""); 
  const [isCheckingAllowance, setIsCheckingAllowance] = useState(false);
  const chainId = useChainId();
  const config = useConfig();
  const account = useConnect().data?.accounts?.[0] || { address: null };
  const total: number = useMemo(() => calculateTotal(amount), [amount]);
  const [hasEnoughTokens, setHasEnoughTokens] = useState(true);
  const { data: hash, isPending, error, writeContractAsync } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed , isError} = useWaitForTransactionReceipt( { hash });
    const tSenderAddress = chainsToTSender[chainId]["tsender"];
    // Use useReadContract hook at the top level
  const { 
    data: allowance, 
    refetch: refetchAllowance,
    isLoading: isAllowanceLoading
  } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: 'allowance',
    args: [account!, tSenderAddress as `0x${string}`],
    query: {
      enabled: !!account && !!tokenAddress && !! tSenderAddress && isAddress(tokenAddress),
    },
  });

  async function handleSubmit() {

    // Handle form submission logic here
    // Develope a logic to Send the airdrop to receipients on click of submit button
    // 1a check if the token Approved to contract, then proceed to 2 ERC20 Token have Allowance function
    // 1b if not approved, then approve the token to contract
    // 2 call thw Airdrop function of tSender contract  
    // 3 wait to mined the transaction and show the success message with tx hash link to etherscan
    const tSenderAddress = chainsToTSender[chainId]["tsender"];

    // Check allowance using the hook data
      setIsCheckingAllowance(true);
      const { data: currentAllowance } = await refetchAllowance();
      setIsCheckingAllowance(false);

      console.log("Approved Amount:", currentAllowance);

      const approvedAmount = currentAllowance ? Number(currentAllowance) : 0;
    
    
    
    if(approvedAmount < total){
        const approveHash = await writeContractAsync({
            abi: erc20Abi,
            address: tokenAddress as `0x${string}`,
            functionName: 'approve',
            args: [tSenderAddress as `0x${string}`, BigInt(total)],
        });
        const approvalReceipt = await waitForTransactionReceipt(config, { hash: approveHash });
        console.log("Approval Tx Mined:", approvalReceipt);

        await writeContractAsync({
            abi: tsenderAbi,
            address: tSenderAddress as `0x${string}`,
            functionName: 'airdropERC20',
            args: [tokenAddress as `0x${string}`, 
               // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),]
        });
    } else {
        await writeContractAsync({
            abi: tsenderAbi,
            address: tSenderAddress as `0x${string}`,
            functionName: 'airdropERC20',
            args: [tokenAddress as `0x${string}`, 
               // Comma or new line separated
                    recipients.split(/[,\n]+/).map(addr => addr.trim()).filter(addr => addr !== ''),
                    amount.split(/[,\n]+/).map(amt => amt.trim()).filter(amt => amt !== ''),
                    BigInt(total),]
        });
    }

        }


    async function getButtonContent() {
        if (isPending) 
            return (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6">
                <CgSpinner className="animate-spin" size={24} />
                <span> Confirming in Wallet...</span>
            </div>)
        if (isConfirming) 
            return (
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6">
                <CgSpinner className="animate-spin" size={24} />
                <span> Waiting for Transaction to be included...</span>
            </div>)
        if (error || isError) {
            console.log("Error:", error || isError);
            return ( 
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6">
                <span> View Error in Console Logs...</span>
                </div>);
                }
        if (isConfirmed) {
            return `Submitted! Tx Hash: ${hash}`;
        }
        return "Submit Token";
    }


    return (
    <div>
        <InputField
            label="Token Address"
            placeholder="0x... Enter ERC20 token address"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
        />
        <br />
        <InputField
            label="Recipients"
            placeholder="0x1,0x2,0x3 Enter recipient addresses separated by commas"
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            large={true}
        />
        <br />
        <InputField
            label="Amount"
            placeholder="100,200,300 Enter amount to airdrop"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            large={true}
        />
        <button
                    className={`cursor-pointer flex items-center justify-center w-full py-3 rounded-[9px] text-white transition-colors font-semibold relative border} 
                    ${!hasEnoughTokens && tokenAddress ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={handleSubmit}
                    disabled={isPending || (!hasEnoughTokens && tokenAddress !== "")}
                    >
                    {/* Gradient */}
                    <div className="absolute w-full inset-0 bg-gradient-to-b from-white/25 via-80% to-transparent mix-blend-overlay z-10 rounded-lg" />
                    {/* Inner shadow */}
                    <div className="absolute w-full inset-0 mix-blend-overlay z-10 inner-shadow rounded-lg" />
                    {/* White inner border */}
                    <div className="absolute w-full inset-0 mix-blend-overlay z-10 border-[1.5px] border-white/20 rounded-lg" />
                    {isPending || error || isConfirming
                    ? getButtonContent()
                    : !hasEnoughTokens && tokenAddress
                    ? "Insufficient token balance"
                    : "Send Tokens"}
        </button>
    </div>
    );
}