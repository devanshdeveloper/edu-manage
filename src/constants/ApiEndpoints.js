const ApiEndpoints = {
  Auth: {
    Login: { url: "/api/auth/login", methods: "POST" },
    Logout: { url: "/api/auth/logout", methods: "POST" },
    ForgetPassword: { url: "/api/auth/forget-password", methods: "POST" },
    Profile: { url: "/api/auth/profile", methods: "GET" },
    ChangePassword: { url: "/api/auth/change-password", methods: "POST" },
  },
  Teacher: {
    CreateOne: { url: "/api/teacher/create-one", methods: "POST" },
    ReadOne: { url: "/api/teacher/read-one", methods: "GET" },
    UpdateOne: { url: "/api/teacher/update-one", methods: "PUT" },
    DeleteOne: { url: "/api/teacher/delete-one", methods: "DELETE" },
    Paginate: { url: "/api/teacher/paginate", methods: "GET" },
    Stats: { url: "/api/teacher/stats", methods: "GET" },
    Dropdown: { url: "/api/teacher/dropdown", methods: "GET" },
  },
  Bank: {
    IFSC: {
      url: "/api/bank/ifsc",
      methods: "GET",
    },
  },
};
export default ApiEndpoints;
