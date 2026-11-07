import About from "@/components/About";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { OrderProvider } from "@/components/OrderContext";
import OrderBuilder from "@/components/OrderBuilder";

export default function Home() {
  return (
    <>
      <OrderProvider>
        <Hero />
        <OrderBuilder />
      </OrderProvider>
      <About />
      <Footer />
    </>
  );
}
