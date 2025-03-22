const readline = require("readline");
const fs = require("fs");

// Function to format raw data
function formatRawData(address, value1, value2) {
    address = address.toLowerCase().replace(/^0x/, "");

    if (address.length !== 40) {
        throw new Error("Invalid Ethereum address");
    }

    let value1Hex = value1.toString(16).padStart(32, "0");
    let value2Hex = value2.toString(16).padStart(32, "0");

    let rawData = `0x56591d596f707374` + "00".repeat(56) +  
                  address + "00".repeat(12) +
                  value1Hex + "00".repeat(56) +
                  value2Hex;

    return rawData;
}

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt user for Ethereum address
rl.question("Paste Ethereum Address: ", (inputAddress) => {
    try {
        let value1 = BigInt("0x16332a97b3fea100");
        let value2 = BigInt("0x16345785d8a0000");

        let rawData = formatRawData(inputAddress, value1, value2);
        
        console.log("\nGenerated Raw Data:\n", rawData);

        // Ask if user wants to save the result
        rl.question("Do you want to save this to a file? (yes/no): ", (saveResponse) => {
            if (saveResponse.toLowerCase() === "yes") {
                const fileName = "rawdata_output.txt";
                fs.writeFileSync(fileName, rawData);
                console.log(`✅ Raw data saved to ${fileName}`);
            } else {
                console.log("❌ Data not saved.");
            }

            console.log("Thank you Tcode");  // Added this line
            rl.close();
        });

    } catch (error) {
        console.error("Error:", error.message);
        rl.close();
    }
});
