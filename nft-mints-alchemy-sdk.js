// Setup: npm install alchemy-sdk
import { Alchemy, Network } from "alchemy-sdk";

const config = {
  apiKey: "M75edmKG39L2nnSm3MHuBUYpB4gJ3VYv",
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);

// Address we want get NFT mints from nikilster.eth
const toAddress = "0x1E6E8695FAb3Eb382534915eA8d7Cc1D1994B152";

const res = await alchemy.core.getAssetTransfers({
  fromBlock: "0x0",
  fromAddress: "0x0000000000000000000000000000000000000000",
  toAddress: toAddress,
  excludeZeroValue: true,
  category: ["erc721", "erc1155"],
});

// Print contract address and tokenId for each NFT (ERC721 or ERC1155):
for (const events of res.transfers) {
  if (events.erc1155Metadata == null) {
    console.log(
      "ERC-721 Token Minted: ID- ",
      events.tokenId,
      " Contract- ",
      events.rawContract.address
    );
  } else {
    for (const erc1155 of events.erc1155Metadata) {
      console.log(
        "ERC-1155 Token Minted: ID- ",
        erc1155.tokenId,
        " Contract- ",
        events.rawContract.address
      );
    }
  }
}