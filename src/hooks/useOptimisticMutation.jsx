import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Custom hook for optimistic updates with React Query mutations
 * @template TData The type of the mutation data
 * @template TError The type of the mutation error
 * @template TVariables The type of the mutation variables
 * @template TContext The type of the mutation context
 * @param {Object} params - The mutation configuration options
 * @param {Array<string|number>} [params.infiniteQueryKeys] - Keys for infinite queries to invalidate
 * @param {Array<string|number>} [params.queryKeys] - Keys for regular queries to invalidate
 * @param {(variables: TVariables) => Promise<TData>} params.mutationFn - The mutation function
 * @param {(data: TVariables, oldData: any) => any} params.actionFunc - Function to compute optimistic update
 * @returns {Object} Mutation result object with optimistic update handling
 * @property {(variables: TVariables) => Promise<TData>} mutate - Function to trigger the mutation
 * @property {boolean} isLoading - Whether the mutation is in progress
 * @property {TError} error - Error object if mutation failed
 * @property {boolean} isError - Whether the mutation encountered an error
 * @property {TData} data - The mutation result data
 */
const useOptimisticMutation = ({ infiniteQueryKeys, queryKeys, ...params }) => {
  const queryClient = useQueryClient();
  const keys = queryKeys || infiniteQueryKeys;
  const mutate = useMutation({
    ...params,
    onMutate: async (data) => {
      await queryClient.cancelQueries(keys);
      const previousData = queryClient.getQueryData(keys);
      queryClient.setQueriesData(keys, (oldData) =>
        params.actionFunc(data, oldData)
      );
      return { previousData };
    },
    onError: (err, newItem, context) => {
      queryClient.setQueriesData(infiniteQueryKeys, context.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(infiniteQueryKeys);
    },
  });
  return {
    ...mutate,
  };
};

export default useOptimisticMutation;

/* Usage Examples:

1. Basic optimistic update with a todo list:
```jsx
function TodoList() {
  const addTodoMutation = useOptimisticMutation({
    queryKeys: ['todos'],
    mutationFn: (newTodo) => api.createTodo(newTodo),
    actionFunc: (newTodo, oldTodos) => [...oldTodos, { ...newTodo, id: Date.now() }]
  });

  const handleAddTodo = (text) => {
    addTodoMutation.mutate({ text, completed: false });
  };

  return (
    <div>
      <AddTodoForm onSubmit={handleAddTodo} />
      {addTodoMutation.isError && <div>Error adding todo!</div>}
    </div>
  );
}
```

2. Optimistic update with infinite query:
```jsx
function PostList() {
  const deletePostMutation = useOptimisticMutation({
    infiniteQueryKeys: ['posts'],
    mutationFn: (postId) => api.deletePost(postId),
    actionFunc: (postId, oldData) => ({
      ...oldData,
      pages: oldData.pages.map(page => ({
        ...page,
        posts: page.posts.filter(post => post.id !== postId)
      }))
    })
  });

  const handleDelete = (postId) => {
    deletePostMutation.mutate(postId);
  };

  return (
    <div>
      {posts.map(post => (
        <PostItem
          key={post.id}
          post={post}
          onDelete={() => handleDelete(post.id)}
        />
      ))}
    </div>
  );
}
```

3. Complex optimistic update with validation:
```jsx
function UserProfile() {
  const updateProfileMutation = useOptimisticMutation({
    queryKeys: ['profile'],
    mutationFn: (updates) => api.updateProfile(updates),
    actionFunc: (updates, oldProfile) => ({
      ...oldProfile,
      ...updates,
      lastUpdated: new Date().toISOString()
    })
  });

  const handleUpdateProfile = (updates) => {
    if (!updates.name) return;
    updateProfileMutation.mutate(updates);
  };

  return (
    <div>
      <ProfileForm
        onSubmit={handleUpdateProfile}
        isLoading={updateProfileMutation.isLoading}
        error={updateProfileMutation.error}
      />
    </div>
  );
}
```
*/
