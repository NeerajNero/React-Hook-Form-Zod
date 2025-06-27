import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

async function FeedbackPage() {
  const feedbackData = await db.feedback.findMany();
  return (
    <main className="min-h-dvh bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">User Feedback</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {feedbackData.map((feedback) => (
          <div
            key={feedback.id}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition-all"
          >
            <p className="text-lg text-gray-800 mb-3 font-medium">{feedback.message}</p>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Feedback ID: {feedback.id}</span>
              <span
                className={`inline-block text-sm font-bold px-3 py-1 rounded 
                  ${getRatingColor(feedback.rating)}
                `}
              >
                Rating: {feedback.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

function getRatingColor(rating: number) {
  if (rating >= 4) return "bg-green-100 text-green-700";
  if (rating === 3) return "bg-yellow-100 text-yellow-700";
  return "bg-red-100 text-red-700";
}

export default FeedbackPage;
