import React from "react"
import axios from 'axios';
import { PlaceholdersAndVanishInput } from "./placeholders-and-vanish-input";

export function SearchBar() {
  const placeholders = ["Type your query...", "Is there a function to log in Python ?", "What is Async in Js ?", "Explain pointer in C"]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const query = formData.get('query') as string;
    const language = "python"

    try {
      const response = await axios.post('/api/query', {query, language});
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
;
  }

  return <>
      <div className="fixed bottom-0 w-full">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        // onChange={(e) => console.log(e.target.value)}
        onSubmit={handleSubmit}
      />
    </div>
  </>
}