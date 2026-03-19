import { Link } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTask, getTasks } from "../../api/task";
import { toast } from "react-toastify";
import { useState } from "react"; 
import { Search } from "lucide-react"; 

export default function AllTasks() {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  
 
  const [searchQuery, setSearchQuery] = useState("");

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteTask({ id, accessToken }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast.success("Task deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete task");
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation(id);
    }
  };

  const { data: apiResponse, isLoading, isError, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => getTasks(accessToken),
    enabled: !!accessToken, 
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <div className="text-center py-20 text-xl font-bold">Loading your tasks...</div>;
  if (isError) return <div className="text-center py-20 text-red-500 font-bold">Error: {error.message}</div>;

  const taskList = apiResponse?.data?.task || [];


  const filteredTasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 mx-auto space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-10 gap-6">
        <h1 className="text-4xl font-bold">My Tasks</h1>
        
     
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tasks by title..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-purple-600 transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="">
          <Link to="/task/newtask" className="text-xl text-purple-600 font-bold hover:underline whitespace-nowrap">
            + Add new task
          </Link>
        </div>
      </div>

   
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div key={task._id} className="border border-gray-300 rounded-md px-6 py-4 shadow-sm hover:shadow-md transition-all bg-white">
            <div className="flex justify-between items-center mb-4">
              <p className={`text-sm font-bold uppercase tracking-wider ${task.tags === 'Urgent' ? 'text-red-500' : 'text-green-500'}`}>
                {task.tags || "General"}
              </p>
              <div className="flex gap-3">
                <Link 
                  to={'/task/edit/' + task._id} 
                  className="bg-purple-600 py-2 px-5 text-white rounded-md flex gap-2 items-center hover:bg-purple-700 font-medium"
                >
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(task._id)}
                  disabled={isDeleting}
                  className="py-2 px-4 border border-purple-600 text-purple-600 rounded-md hover:bg-red-50 font-medium disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
            <hr className="border-gray-100" />
            <h2 className="py-4 text-3xl font-bold capitalize text-gray-800">
              {task.title}
            </h2>
            <p className="text-justify text-gray-600 pb-4 leading-relaxed text-lg">
              {task.description}
            </p>
          </div>
        ))
      ) : (
        <div className="text-center py-24 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
          <p className="text-gray-400 text-xl italic font-medium">
            {searchQuery ? `No tasks match "${searchQuery}"` : "No tasks found. Click '+ Add new task' to get started!"}
          </p>
        </div>
      )}

      <button
        onClick={scrollToTop}
        className="underline text-purple-500 my-8 text-center w-full font-bold hover:text-purple-700 transition-colors"
      >
        Back To Top
      </button>
    </div>
  );
}