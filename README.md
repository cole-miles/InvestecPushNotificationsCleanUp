# InvestecPushNotificationsCleanUp

A companion Google Cloud Function for the [InvestecPushNotifications](https://github.com/cole-miles/InvestecPushNotifications) project. This function periodically cleans up the Firestore collection of processed deposit records, helping you avoid exceeding Firestore free tier limits.

## Features

- 🧹 Deletes all documents from the `processed_deposits` Firestore collection.
- ⏰ Can be scheduled to run automatically using Google Cloud Scheduler.
- ⚡ Runs serverless on Google Cloud Functions.

## Prerequisites

- You have already set up your Google Cloud project, enabled Firestore, and installed the gcloud CLI as described in the [InvestecPushNotifications README](https://github.com/cole-miles/InvestecPushNotifications/blob/main/README.md).
- Your `InvestecPushNotifications` function is using a Firestore collection named `processed_deposits` to track processed transactions.

## Setup Instructions

### 1. Clone the Repository

```shell
git clone https://github.com/cole-miles/InvestecPushNotificationsCleanUp.git
cd InvestecPushNotificationsCleanUp
```

### 2. Install Dependencies

```shell
npm install
```

### 3. Deploy to Google Cloud Functions

Make sure you are using the same Google Cloud project as your main InvestecPushNotifications function.

```shell
gcloud functions deploy cleanupProcessedDeposits \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region YOUR_REGION
```

Replace `YOUR_REGION` with your chosen Google Cloud region (e.g., `us-central1`).

### 4. Schedule Automatic Cleanup (Optional)

You can use Google Cloud Scheduler to trigger this function at your preferred interval (e.g., daily or weekly):

1. Go to **Google Cloud Console > Cloud Scheduler**.
2. Create a new job.
3. Set the frequency (e.g., `0 0 * * *` for daily at midnight).
4. Set the target as HTTP.
5. Use the Cloud Function URL as the endpoint.
6. Set the HTTP method to POST.

## How It Works

This function deletes **all** documents in the `processed_deposits` Firestore collection each time it runs. This helps keep your Firestore usage within free tier limits and ensures old processed transaction records do not accumulate.

## Customization

If you need to change the collection name, update this line in `index.js`:

```javascript
const processedDepositsRef = db.collection('processed_deposits');
```

## Files and Directory Structure

- `index.js` – Main function code.
- `package.json` and `package-lock.json` – Node.js dependencies.
- `.gcloudignore` and `.gitignore` – Ignore files for deployment and version control.

## Related Projects

- [InvestecPushNotifications](https://github.com/cole-miles/InvestecPushNotifications): The main transaction monitoring and notification function.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License – see the LICENSE file for details.

## Support

If you encounter any problems or have questions, please open an issue in this repository.
