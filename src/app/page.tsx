"use client";

import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const formSchema = z.object({
    message: z.string().min(2).max(100),
    rating: z.number().min(1).max(5),
  });

  type formFields = z.infer<typeof formSchema>; // Define the type for form fields using zod schema.

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formFields>({
    resolver: zodResolver(formSchema),
  }); // Initialize useForm with the type and extract register and handleSubmit, register is used to register the input fields with react-hook-form, handleSubmit is used to handle the form submission

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    // Define the onSubmit function with the type formFields, this function will be called when the form is submitted
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit feedback");
      }

      const result = await res.json();
      console.log("Feedback saved:", result);
      alert("Feedback submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit feedback. Please try again later.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4">
  <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl space-y-6">
    <h1 className="text-3xl font-bold text-center text-gray-800">Share Your Feedback</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Message
        </label>
        <input
          {...register("message")}
          id="message"
          type="text"
          placeholder="Your feedback..."
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.message && (
          <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
          Rating (1-5)
        </label>
        <input
          {...register("rating", { valueAsNumber: true })}
          id="rating"
          type="number"
          placeholder="Rate us out of 5"
          min={1}
          max={5}
          className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.rating && (
          <p className="text-sm text-red-500 mt-1">{errors.rating.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg shadow-sm disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit Feedback"}
      </button>
    </form>
  </div>
</main>

  );
}
