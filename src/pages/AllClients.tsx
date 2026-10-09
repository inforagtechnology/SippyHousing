import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/layout/AdminLayout";
import { clientService, Client } from "@/services/clientService";
import { 
  Search, 
  Filter, 
   ArrowLeft, 
  Download, 
  Eye, 
  Edit, 
  Trash2,
  Phone,
  Mail,
  Calendar,
  User,
  MessageSquare,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

const AllClients = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [interestFilter, setInterestFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"created_at" | "full_name">("created_at");

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    filterAndSortClients();
  }, [clients, searchTerm, interestFilter, sortBy]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAllClients();
      setClients(data);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Error",
        description: "Failed to fetch clients. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortClients = () => {
    let filtered = [...clients];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone_number.includes(searchTerm) ||
          (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          client.interest_area.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply interest area filter
    if (interestFilter !== "all") {
      filtered = filtered.filter((client) => client.interest_area === interestFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (sortBy === "created_at") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else {
        return a.full_name.localeCompare(b.full_name);
      }
    });

    setFilteredClients(filtered);
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) {
      return;
    }

    try {
      await clientService.deleteClient(id);
      toast({
        title: "Success",
        description: "Client deleted successfully.",
      });
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error("Error deleting client:", error);
      toast({
        title: "Error",
        description: "Failed to delete client. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInterestAreaColor = (area: string) => {
    const colors: { [key: string]: string } = {
      "luxury-homes": "bg-purple-100 text-purple-800",
      "investment": "bg-blue-100 text-blue-800",
      "joint-venture": "bg-green-100 text-green-800",
      "resale": "bg-orange-100 text-orange-800",
      "rental": "bg-pink-100 text-pink-800",
      "General Inquiry": "bg-gray-100 text-gray-800",
    };
    return colors[area] || "bg-gray-100 text-gray-800";
  };

  const exportClients = () => {
    const csvContent = [
      ["Name", "Phone", "Email", "Interest Area", "Message", "Created At"],
      ...filteredClients.map((client) => [
        client.full_name,
        client.phone_number,
        client.email || "",
        client.interest_area,
        client.message || "",
        format(new Date(client.created_at), "dd/MM/yyyy HH:mm"),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `clients-${format(new Date(), "dd-MM-yyyy")}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Success",
      description: "Clients exported successfully.",
    });
  };

  const uniqueInterestAreas = Array.from(
    new Set(clients.map((client) => client.interest_area))
  ).sort();

  if (loading) {
    return (
      <AdminLayout title="All Clients">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading clients...</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="All Clients">

          <Button 
          variant="outline" 
          onClick={() => navigate("/admin")}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button> 
      <div className="mb-8">
        <p className="text-gray-600">
          Manage and view all client inquiries and contact form submissions
        </p>
      </div>

      {/* Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{clients.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.filter(
                    (client) =>
                      new Date(client.created_at).getMonth() === new Date().getMonth()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">With Email</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.filter((client) => client.email).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-2xl font-bold text-gray-900">
                  {clients.filter(
                    (client) =>
                      new Date(client.created_at).toDateString() ===
                      new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Interest Area Filter */}
              <Select value={interestFilter} onValueChange={setInterestFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by interest" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Interests</SelectItem>
                  {uniqueInterestAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort By */}
              <Select value={sortBy} onValueChange={(value: "created_at" | "full_name") => setSortBy(value)}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created_at">Newest First</SelectItem>
                  <SelectItem value="full_name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Export Button */}
            <Button onClick={exportClients} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle>Client Inquiries</CardTitle>
          <CardDescription>
            Showing {filteredClients.length} of {clients.length} clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No clients found matching your criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Interest Area</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{client.full_name}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1 text-gray-500" />
                            {client.phone_number}
                          </div>
                          {client.email && (
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-3 w-3 mr-1" />
                              {client.email}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getInterestAreaColor(client.interest_area)}>
                          {client.interest_area}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          {client.message ? (
                            <p className="text-sm text-gray-600 truncate" title={client.message}>
                              {client.message}
                            </p>
                          ) : (
                            <span className="text-sm text-gray-400">No message</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600">
                          {format(new Date(client.created_at), "dd/MM/yyyy")}
                          <br />
                          <span className="text-xs text-gray-400">
                            {format(new Date(client.created_at), "HH:mm")}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // View client details (you can implement a modal or separate page)
                              toast({
                                title: "Client Details",
                                description: `Name: ${client.full_name}\nPhone: ${client.phone_number}\nEmail: ${client.email || "N/A"}\nInterest: ${client.interest_area}\nMessage: ${client.message || "N/A"}`,
                              });
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              // Edit client (you can implement this functionality)
                              toast({
                                title: "Edit Client",
                                description: "Edit functionality can be implemented here.",
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteClient(client.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AllClients; 