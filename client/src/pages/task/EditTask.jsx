import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Loader } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import { getSingleTask, updateTask } from "../../api/task";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { validateTaskSchema } from "../../utils/dataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function EditTask() {
  const { id } = useParams();
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { handleSubmit, register, setValue, watch, reset,  formState: { errors }, } = useForm({
    resolver: zodResolver(validateTaskSchema),
  });

  const currentTag = watch("tags");

  // 1. Fetch existing task data
  const { data: apiResponse, isLoading } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getSingleTask({ id, accessToken }),
    enabled: !!accessToken && !!id,
  });

  // 2. Fill form when data is loaded
  useEffect(() => {
    if (apiResponse?.data?.task) {
      reset(apiResponse.data.task);
    }
  }, [apiResponse, reset]);

  const mutation = useMutation({
    mutationFn: (data) => updateTask({ id, taskData: data, accessToken }),
    onSuccess: () => {
      toast.success("Task updated successfully");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      navigate("/task/allTask");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update task");
    },
  });

  const onSubmitForm = (data) => {
    if (!id) return toast.error("Task ID is missing");
    mutation.mutate(data);
  };

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin" />
      </div>
    );

  return (
    <div className="container px-4 mx-auto w-full">
      <div className="flex items-center gap-1 my-6 md:my-10">
        <Link to="/task/allTask">
          <ChevronLeft />
        </Link>
        <h1 className="text-2xl font-semibold">Edit Task</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-8 w-full"
      >
  
        <div className="relative border border-gray-200 rounded">
          <label className="text-sm absolute -top-3 left-4 bg-white px-2 font-medium text-gray-500">
            Task Title
          </label>
          <input
            type="text"
            className="py-4 px-4 outline-none w-full"
            {...register("title")}
          />
           {errors.title && (
            <span className="text-red-500 text-xs pl-4">
              {errors.title.message}
            </span>
          )}
        </div>

     
        <div className="relative border border-gray-200 rounded">
          <label className="text-sm absolute -top-3 left-4 bg-white px-2 font-medium text-gray-500">
            Description
          </label>
          <textarea
            className="outline-none resize-none w-full px-4 pt-5"
            rows={5}
            {...register("description")}
          />
          {errors.description && (
            <span className="text-red-500 text-xs pl-4">
              {errors.description.message}
            </span>
          )}
        </div>

      
        <div className="relative border border-gray-200 rounded p-4">
          <label className="text-sm absolute -top-3 left-4 bg-white px-2 font-medium text-gray-500">
            Tags
          </label>
          <div className="flex gap-3 mt-2">
            {["Urgent", "Important"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setValue("tags", tag)}
                className={`flex-1 py-3 rounded font-bold transition-all ${
                  currentTag === tag
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <input type="hidden" {...register("tags")} />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="bg-purple-500 text-white w-full rounded py-4 font-bold text-lg flex justify-center items-center"
        >
          {mutation.isPending ? (
            <Loader className="animate-spin" />
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
}
