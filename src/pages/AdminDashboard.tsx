// import { useNavigate } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import AdminLayout from "@/components/layout/AdminLayout";
// import {
//   Building2,
//   Home,
//   Key,
//   Plus,
//   Users,
//   BarChart3,
//   Calendar,
//   UserCheck,
//   Phone
// } from "lucide-react";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const handleAddApartment = () => {
//     navigate("/admin/add-property");
//   };

//   const handleViewClients = () => {
//     navigate("/admin/clients");
//   };
//   const handleViewLeads = () => {
//     navigate("/admin/leads");
//   };
//   return (
//     <AdminLayout title="Welcome to Admin Dashboard">
//       <div className="mb-8">
//         <p className="text-gray-600">Manage your properties, apartments, and listings</p>
//       </div>

//       {/* Stats Cards */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Building2 className="h-6 w-6 text-blue-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Apartments</p>
//                 <p className="text-2xl font-bold text-gray-900"></p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <Home className="h-6 w-6 text-green-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Resale Properties</p>
//                 <p className="text-2xl font-bold text-gray-900">12</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-purple-100 rounded-lg">
//                 <Key className="h-6 w-6 text-purple-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Rental Properties</p>
//                 <p className="text-2xl font-bold text-gray-900">8</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-6">
//             <div className="flex items-center">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <Users className="h-6 w-6 text-orange-600" />
//               </div>
//               <div className="ml-4">
//                 <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
//                 <p className="text-2xl font-bold text-gray-900">156</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div> */}

//       {/* Management Sections */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
//         {/* Apartments Section */}
//         <Card className="border-2 border-blue-200">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <Building2 className="h-6 w-6 text-blue-600" />
//               <CardTitle className="text-lg">Manage Properties</CardTitle>
//             </div>
//             <CardDescription>
//               Manage new apartment listings and existing properties
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Button
//               className="w-full"
//               onClick={handleAddApartment}
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add New Apartment
//             </Button>
//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => navigate("/admin/properties")}
//             >
//               <BarChart3 className="h-4 w-4 mr-2" />
//               View All Apartments
//             </Button>
//             <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
//               <Calendar className="h-4 w-4 mr-2" />
//               Manage Availability
//             </Button>
//           </CardContent>
//         </Card>

//         {/* Resale Properties Section */}
//         {/* <Card className="border-2 border-green-200">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <Home className="h-6 w-6 text-green-600" />
//               <CardTitle className="text-lg">Resale Properties</CardTitle>
//             </div>
//             <CardDescription>
//               Add and manage properties available for resale
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Button 
//               className="w-full bg-green-600 hover:bg-green-700" 
//               onClick={handleAddResale}
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add Resale Property
//             </Button>
//             <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
//               <BarChart3 className="h-4 w-4 mr-2" />
//               View All Resale
//             </Button>
//             <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
//               <Calendar className="h-4 w-4 mr-2" />
//               Manage Listings
//             </Button>
//           </CardContent>
//         </Card> */}

//         {/* Rental Properties Section */}
//         {/* <Card className="border-2 border-purple-200">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <Key className="h-6 w-6 text-purple-600" />
//               <CardTitle className="text-lg">Rental Properties</CardTitle>
//             </div>
//             <CardDescription>
//               Manage properties available for rent
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Button 
//               className="w-full bg-purple-600 hover:bg-purple-700" 
//               onClick={handleAddRental}
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Add Rental Property
//             </Button>
//             <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
//               <BarChart3 className="h-4 w-4 mr-2" />
//               View All Rentals
//             </Button>
//             <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
//               <Calendar className="h-4 w-4 mr-2" />
//               Manage Bookings
//             </Button>
//           </CardContent>
//         </Card> */}

//         {/* Clients Section */}
//         <Card className="border-2 border-orange-200">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <UserCheck className="h-6 w-6 text-orange-600" />
//               <CardTitle className="text-lg">Client Management</CardTitle>
//             </div>
//             <CardDescription>
//               View and manage client inquiries and contact submissions
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <Button
//               className="w-full bg-orange-600 hover:bg-orange-700"
//               onClick={handleViewClients}
//             >
//               <Users className="h-4 w-4 mr-2" />
//               View All Clients
//             </Button>
//             <Button variant="outline" className="w-full" onClick={handleViewClients}>
//               <BarChart3 className="h-4 w-4 mr-2" />
//               Client Analytics
//             </Button>
//             <Button variant="outline" className="w-full" onClick={handleViewClients}>
//               <Calendar className="h-4 w-4 mr-2" />
//               Recent Inquiries
//             </Button>
//           </CardContent>
//         </Card>
//         {/* // About Us Section */}
//         <Card className="border-2 border-indigo-200">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <Building2 className="h-6 w-6 text-indigo-600" />
//               <CardTitle className="text-lg">About Us Management</CardTitle>
//             </div>

//             <CardDescription>
//               Update and manage About Us page content
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             {/* <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700"
//               onClick={() => navigate("/admin/about-us")}
//             >
//               <Plus className="h-4 w-4 mr-2" />
//               Edit About Us
//             </Button> */}
//             <Button
//               className="w-full bg-indigo-600 hover:bg-indigo-700"
//               onClick={() => navigate("/admin/team-management")}
//             >
//               Manage Team Members
//             </Button>

//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => navigate("/admin/team-management")}
//             >
//               <BarChart3 className="h-4 w-4 mr-2" />
//               View Content
//             </Button>

//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={() => navigate("/admin/team-management")}
//             >
//               <Calendar className="h-4 w-4 mr-2" />
//               Update Details
//             </Button>
//           </CardContent>
//         </Card>



//         <Card className="border-2 border-emerald-200">
//           <CardHeader>
//             <div className="flex items-center space-x-2">
//               <Phone className="h-6 w-6 text-emerald-600" />
//               <CardTitle className="text-lg">Lead Management</CardTitle>
//             </div>

//             <CardDescription>
//               View and manage leads captured from property pages
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <Button
//               className="w-full bg-emerald-600 hover:bg-emerald-700"
//               onClick={handleViewLeads}
//             >
//               <Users className="h-4 w-4 mr-2" />
//               View All Leads
//             </Button>

//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={handleViewLeads}
//             >
//               <BarChart3 className="h-4 w-4 mr-2" />
//               Lead Analytics
//             </Button>

//             <Button
//               variant="outline"
//               className="w-full"
//               onClick={handleViewLeads}
//             >
//               <Calendar className="h-4 w-4 mr-2" />
//               Recent Leads
//             </Button>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       {/* <div className="mt-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Quick Actions</CardTitle>
//             <CardDescription>
//               Common tasks and shortcuts
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Button variant="outline" className="h-20 flex-col">
//                 <Users className="h-6 w-6 mb-2" />
//                 Manage Inquiries
//               </Button>
//               <Button variant="outline" className="h-20 flex-col">
//                 <BarChart3 className="h-6 w-6 mb-2" />
//                 View Analytics
//               </Button>
//               <Button variant="outline" className="h-20 flex-col">
//                 <Settings className="h-6 w-6 mb-2" />
//                 Site Settings
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div> */}




//     </AdminLayout>
//   );
// };

// export default AdminDashboard; 


import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/layout/AdminLayout";
import {
  Building2,
  Home,
  Key,
  Plus,
  Users,
  BarChart3,
  Calendar,
  UserCheck,
  Phone,
  MessageSquare,
  Settings
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddApartment = () => {
    navigate("/admin/add-property");
  };

  const handleViewClients = () => {
    navigate("/admin/clients");
  };
  const handleViewLeads = () => {
    navigate("/admin/leads");
  };
  const handleViewTestimonials = () => {
    navigate("/admin/testimonials");
  };
  const handleViewSettings = () => {
    navigate("/admin/settings");
  };
  return (
    <AdminLayout title="Welcome to Admin Dashboard">
      <div className="mb-8">
        <p className="text-gray-600">Manage your properties, apartments, and listings</p>
      </div>

      {/* Stats Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Apartments</p>
                <p className="text-2xl font-bold text-gray-900"></p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Home className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resale Properties</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Key className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rental Properties</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> */}

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
        {/* Apartments Section */}
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-lg">Manage Properties</CardTitle>
            </div>
            <CardDescription>
              Manage new apartment listings and existing properties
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full"
              onClick={handleAddApartment}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Apartment
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/admin/properties")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Apartments
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
              <Calendar className="h-4 w-4 mr-2" />
              Manage Availability
            </Button>
          </CardContent>
        </Card>

        {/* Resale Properties Section */}
        {/* <Card className="border-2 border-green-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-green-600" />
              <CardTitle className="text-lg">Resale Properties</CardTitle>
            </div>
            <CardDescription>
              Add and manage properties available for resale
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-green-600 hover:bg-green-700" 
              onClick={handleAddResale}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Resale Property
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Resale
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
              <Calendar className="h-4 w-4 mr-2" />
              Manage Listings
            </Button>
          </CardContent>
        </Card> */}

        {/* Rental Properties Section */}
        {/* <Card className="border-2 border-purple-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="h-6 w-6 text-purple-600" />
              <CardTitle className="text-lg">Rental Properties</CardTitle>
            </div>
            <CardDescription>
              Manage properties available for rent
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700" 
              onClick={handleAddRental}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Rental Property
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Rentals
            </Button>
            <Button variant="outline" className="w-full" onClick={() => navigate("/admin/properties")}>
              <Calendar className="h-4 w-4 mr-2" />
              Manage Bookings
            </Button>
          </CardContent>
        </Card> */}

        {/* Clients Section */}
        <Card className="border-2 border-orange-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-6 w-6 text-orange-600" />
              <CardTitle className="text-lg">Client Management</CardTitle>
            </div>
            <CardDescription>
              View and manage client inquiries and contact submissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full bg-orange-600 hover:bg-orange-700"
              onClick={handleViewClients}
            >
              <Users className="h-4 w-4 mr-2" />
              View All Clients
            </Button>
            <Button variant="outline" className="w-full" onClick={handleViewClients}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Client Analytics
            </Button>
            <Button variant="outline" className="w-full" onClick={handleViewClients}>
              <Calendar className="h-4 w-4 mr-2" />
              Recent Inquiries
            </Button>
          </CardContent>
        </Card>
        {/* // About Us Section */}
        <Card className="border-2 border-indigo-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-indigo-600" />
              <CardTitle className="text-lg">About Us Management</CardTitle>
            </div>

            <CardDescription>
              Update and manage About Us page content
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/admin/about-us")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Edit About Us
            </Button> */}
            <Button
              className="w-full bg-indigo-600 hover:bg-indigo-700"
              onClick={() => navigate("/admin/team-management")}
            >
              Manage Team Members
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/admin/team-management")}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              View Content
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/admin/team-management")}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Update Details
            </Button>
          </CardContent>
        </Card>



        <Card className="border-2 border-emerald-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Phone className="h-6 w-6 text-emerald-600" />
              <CardTitle className="text-lg">Lead Management</CardTitle>
            </div>

            <CardDescription>
              View and manage leads captured from property pages
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={handleViewLeads}
            >
              <Users className="h-4 w-4 mr-2" />
              View All Leads
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleViewLeads}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Lead Analytics
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleViewLeads}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Recent Leads
            </Button>
          </CardContent>
        </Card>

        {/* Testimonials Section */}
        <Card className="border-2 border-rose-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-rose-600" />
              <CardTitle className="text-lg">Testimonials</CardTitle>
            </div>

            <CardDescription>
              Add, edit, or remove client reviews shown on the About Us page
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              className="w-full bg-rose-600 hover:bg-rose-700"
              onClick={handleViewTestimonials}
            >
              <Plus className="h-4 w-4 mr-2" />
              Manage Testimonials
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleViewTestimonials}
            >
              <Users className="h-4 w-4 mr-2" />
              View All Reviews
            </Button>
          </CardContent>
        </Card>

        {/* Website Settings Section */}
        <Card className="border-2 border-slate-200">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-6 w-6 text-slate-600" />
              <CardTitle className="text-lg">Website Settings</CardTitle>
            </div>

            <CardDescription>
              Update contact info, social links, and footer quick links
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <Button
              className="w-full bg-slate-600 hover:bg-slate-700"
              onClick={handleViewSettings}
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Settings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {/* <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-6 w-6 mb-2" />
                Manage Inquiries
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <BarChart3 className="h-6 w-6 mb-2" />
                View Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Settings className="h-6 w-6 mb-2" />
                Site Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div> */}




    </AdminLayout>
  );
};

export default AdminDashboard; 