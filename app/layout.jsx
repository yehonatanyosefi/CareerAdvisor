import "./globals.css";
import { instrumentSans } from "./styles/fonts";

export const metadata = {
  title: "LangchainJS Sports Career Coach",
  description: "Chat with your personalized sports career coach.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.className} `}>
        <main className="flex flex-col pt-4 px-10">{children}</main>
      </body>
    </html>
  );
}