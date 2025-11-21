import { Transfer as TransferEvent } from "../generated/AngelToken/ERC20";
import { Transfer } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let transfer = new Transfer(
    event.transaction.hash.toHexString() + "-" + event.logIndex.toString()
  );

  transfer.from = event.params.from;
  transfer.to = event.params.to;
  transfer.value = event.params.value;
  transfer.timestamp = event.block.timestamp;
  transfer.blockNumber = event.block.number;
  transfer.transactionHash = event.transaction.hash;

  transfer.save();
}
