// src/app/page.tsx or src/app/page.js

import ClientComponent from "./redirectComponent"; // Import your client component

export default function Home() {
  return (
    <div>
      <ClientComponent />
    </div>
  );
}
