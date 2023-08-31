// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [curCurrency, setCurCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [amount, setAmount] = useState(1);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${curCurrency}&to=${toCurrency}`,
          signal
        );
        if (!res.ok) throw new Error("Currency exchange error.");
        const data = await res.json();
        setOutput(Object.values(data.rates)[0]);
      } catch (err) {
        if (err.name !== "AbortError") console.error(err.message);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [amount, curCurrency, toCurrency]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(+e.target.value)}
      />
      <select
        value={curCurrency}
        onChange={(e) => setCurCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {output} {toCurrency}
      </p>
    </div>
  );
}
