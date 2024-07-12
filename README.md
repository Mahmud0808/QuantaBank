<div align="center">
  <br />
    <img src="https://i.postimg.cc/Mq5sZCPj/Quanta-Bank.png" alt="Project Banner">
  <br />
  <br />

  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=393D72" alt="nextjs" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=3FBFF8" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Shadcn_UI-black?style=for-the-badge&logoColor=white&logo=shadcnui&color=1f223b" alt="shadcnui" />
    <img src="https://img.shields.io/badge/-Typescript-black?style=for-the-badge&logoColor=white&logo=typescript&color=387CC8" alt="typescript" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=F1346B" alt="appwrite" />
  </div>

  <h2 align="center">Quanta Bank</h2>

  <div align="center">
     <b>Quanta Bank</b> is a dynamic financial platform that connects to multiple bank accounts, displays transactions in real-time, allows users to transfer money to other platform users, and manages their finances comprehensively. Built with Next.js, TypeScript, and Appwrite, Quanta Bank offers a seamless and secure experience for managing and interacting with financial data.
  </div>
</div>

## <a name="features">✨ Features</a>

- **Authentication:** An ultra-secure SSR authentication with proper validations and authorization.

- **Connect Banks:** Integrates with Plaid for multiple bank account linking.

- **Home Page:** Shows a general overview of the user account with total balance from all connected banks, recent transactions, money spent on different categories, etc.

- **My Banks:** Check the complete list of all connected banks with respective balances and account details.

- **Transaction History:** Includes pagination and filtering options for viewing transaction history of different banks.

- **Real-time Updates:** Reflects changes across all relevant pages upon connecting new bank accounts.

- **Funds Transfer:** Allows users to transfer funds using Dwolla to other accounts with required fields and recipient bank ID.

- **Responsiveness:** Ensures the application adapts seamlessly to various screen sizes and devices, providing a consistent user experience across desktop, tablet, and mobile platforms.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **Frontend:** Next.js, Shadcn UI, TailwindCSS

- **Backend:** Next.js, Appwrite

- **Forms:** React Hook Form for form handling

- **Validation:** Zod for input validation

- **Type Safety:** TypeScript for type-checking and improved code quality

- **Integration:** Plaid and Dwolla for secure connection to bank account

- **Serverless APIs:** Deploy and manage APIs serverlessly

## <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Cloning the Repository

```bash
git clone https://github.com/Mahmud0808/QuantaBank.git
cd QuantaBank
```

### Installation

Install the project dependencies using npm:

```bash
npm install
```

### Set Up Environment Variables

Create a new file named `.env` in the root of your project and add the following content:

```env
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

Replace the placeholder values with your actual credentials. You can obtain these credentials by signing up for the corresponding websites on [Appwrite](https://appwrite.io/?utm_source=youtube&utm_content=reactnative&ref=JSmastery), [Plaid](https://plaid.com/) and [Dwolla](https://www.dwolla.com/). 

### Running the Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

## 🤝 Contributing

Contributions are welcome! Here's how you can contribute:

- Fork the repository.
- Create your feature branch (`git checkout -b feature/AmazingFeature`).
- Commit your changes (`git commit -m 'Add some AmazingFeature'`).
- Push to the branch (`git push origin feature/AmazingFeature`).
- Open a pull request.

## 📬 Contact

Wanna reach out to me? DM me at 👇

Email: mahmudul15-13791@diu.edu.bd