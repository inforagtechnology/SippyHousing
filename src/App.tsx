// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import PropertyDetails from "./pages/PropertyDetails";
// import ResaleRentDetails from "./pages/ResaleRentDetails";
// import AdminLogin from "./pages/AdminLogin";
// import AdminDashboard from "./pages/AdminDashboard";
// import AllProperties from "./pages/AllProperties";
// import AddProperty from "./pages/AddProperty";
// import EditProperty from "./pages/EditProperty";
// import SearchResults from "./pages/SearchResults";
// import AllClients from "./pages/AllClients";
// import AboutUs from "./pages/AboutUs";
// import Favorites from "./pages/Favorites";
// import ProtectedRoute from "./components/common/ProtectedRoute";
// import ScrollToTop from "./components/common/ScrollToTop";
// import { CartProvider } from "./contexts/CartContext";
// import TeamManagement from "./pages/TeamManagement";
// import Leads from "./pages/VisitorLeads";
// import TestimonialsAdmin from "./pages/TestimonialsAdmin"
// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <CartProvider>
//         <Toaster />
//         <Sonner />
//         <Router>
//           <ScrollToTop />
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/about" element={<AboutUs />} />
//             <Route path="/favorites" element={<Favorites />} />
//             <Route path="/property/:id" element={<PropertyDetails />} />
//             <Route path="/property-details" element={<PropertyDetails />} />
//             <Route path="/resale-rent-details" element={<ResaleRentDetails />} />
//             <Route path="/search" element={<SearchResults />} />

//             {/* Admin Routes */}
//             <Route path="/admin/login" element={<AdminLogin />} />
//             <Route
//               path="/admin"
//               element={
//                 <ProtectedRoute>
//                   <AdminDashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/properties"
//               element={
//                 <ProtectedRoute>
//                   <AllProperties />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/add-property"
//               element={
//                 <ProtectedRoute>
//                   <AddProperty />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/edit-property/:id"
//               element={
//                 <ProtectedRoute>
//                   <EditProperty />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/clients"
//               element={
//                 <ProtectedRoute>
//                   <AllClients />
//                 </ProtectedRoute>
//               }
//             />
//             <Route
//               path="/admin/team-management"
//               element={<TeamManagement />}
//             />
//             <Route
//               path="/admin/leads"
//               element={<Leads />}
//             />
//             <Route 
//             path="/admin/testimonials" 
//             element={<TestimonialsAdmin />} 
//             />

//             {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </Router>
//       </CartProvider>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyDetails from "./pages/PropertyDetails";
import ResaleRentDetails from "./pages/ResaleRentDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AllProperties from "./pages/AllProperties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import SearchResults from "./pages/SearchResults";
import AllClients from "./pages/AllClients";
import AboutUs from "./pages/AboutUs";
import Favorites from "./pages/Favorites";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ScrollToTop from "./components/common/ScrollToTop";
import { CartProvider } from "./contexts/CartContext";
import TeamManagement from "./pages/TeamManagement";
import Leads from "./pages/VisitorLeads";
import TestimonialsAdmin from "./pages/TestimonialsAdmin"
import WebsiteSettings from "./pages/WebSiteSetting";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/property-details" element={<PropertyDetails />} />
            <Route path="/resale-rent-details" element={<ResaleRentDetails />} />
            <Route path="/search" element={<SearchResults />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/properties"
              element={
                <ProtectedRoute>
                  <AllProperties />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-property"
              element={
                <ProtectedRoute>
                  <AddProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit-property/:id"
              element={
                <ProtectedRoute>
                  <EditProperty />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clients"
              element={
                <ProtectedRoute>
                  <AllClients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/team-management"
              element={<TeamManagement />}
            />
            <Route
              path="/admin/leads"
              element={<Leads />}
            />
            <Route
              path="/admin/testimonials"
              element={
                <ProtectedRoute>
                  <TestimonialsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <WebsiteSettings />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
