const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

// Firestore collection to store processed transaction IDs
const processedDepositsRef = db.collection('processed_deposits');

exports.cleanupProcessedDeposits = async (req, res) => {
    try {
        console.log("Starting Firestore cleanup...");

        // Get all documents in the collection
        const snapshot = await processedDepositsRef.get();
        if (snapshot.empty) {
            console.log("No processed deposits to delete.");
            res.status(200).send("No data to delete.");
            return;
        }

        // Delete each document in the collection
        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });

        // Commit the batch delete
        await batch.commit();
        console.log("Successfully deleted all processed deposits.");
        res.status(200).send("Firestore cleaned up successfully.");
    } catch (error) {
        console.error("Error during cleanup:", error.message);
        res.status(500).send("Error cleaning up Firestore.");
    }
};
