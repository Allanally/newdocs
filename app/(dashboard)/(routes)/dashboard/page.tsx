import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPurchasedDocuments } from "@/actions/get-dashboard-documents";

export default async function Dashboard() {
  const { userId } = auth();
  if (!userId) {
    return redirect('/');
  }

  try {
    const purchasedDocuments = await getPurchasedDocuments(userId);

    if (!purchasedDocuments || purchasedDocuments.length === 0) {
      return (
        <div className="p-6 space-y-4">
          <h2 className="text-2xl font-semibold">Your Purchased Documents</h2>
          <p>No documents purchased yet.</p>
        </div>
      );
    }

    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Your Purchased Documents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {purchasedDocuments.map((document) => (
            <div key={document.id} className="border p-4 rounded-md shadow-md">
              {document.imageUrl && (
                <img
                  src={document.imageUrl}
                  alt={document.title}
                  className="w-full h-40 object-cover rounded-md mb-2"
                />
              )}
              <p className="text-sm text-gray-600">{document.title}</p>
              {document.Attachments && document.Attachments.length > 0 && (
                <a 
                  href={document.Attachments[0].url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:underline hover:cursor-pointer"
                >
                  View Document
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching purchased documents:", error);
    return (
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-semibold">Your Purchased Documents</h2>
        <p>Something went wrong, please try again later.</p>
      </div>
    );
  }
}
