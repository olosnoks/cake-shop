import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, Image, ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { apiService } from '@/services/api';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [orderDetails, setOrderDetails] = useState({
    cakeSize: 'medium',
    message: '',
    deliveryDate: ''
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const ordersData = await apiService.getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to load orders:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmitOrder = async () => {
    if (!selectedFile) {
      toast({ title: 'Please select an image', variant: 'destructive' });
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('cakeSize', orderDetails.cakeSize);
      formData.append('message', orderDetails.message);
      formData.append('deliveryDate', orderDetails.deliveryDate);
      formData.append('totalPrice', '25.00');

      await apiService.createOrder(formData);
      
      setSelectedFile(null);
      setPreviewUrl(null);
      setOrderDetails({ cakeSize: 'medium', message: '', deliveryDate: '' });
      
      toast({ title: 'Order submitted successfully!' });
      loadOrders();
    } catch (error) {
      toast({ title: 'Failed to submit order', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-pink-600" />
              <span className="text-gray-700">{user?.email}</span>
            </div>
            <Button variant="outline" onClick={logout} className="border-pink-300 text-pink-600 hover:bg-pink-50">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center text-pink-700">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-pink-300 rounded-lg p-8 text-center">
                {previewUrl ? (
                  <div className="space-y-4">
                    <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
                    <p className="text-sm text-gray-600">{selectedFile?.name}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Image className="h-12 w-12 text-pink-400 mx-auto" />
                    <p className="text-gray-600">Click to upload image</p>
                  </div>
                )}
                <Input type="file" accept="image/*" onChange={handleFileSelect} className="mt-4" />
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cakeSize">Cake Size</Label>
                  <select
                    id="cakeSize"
                    value={orderDetails.cakeSize}
                    onChange={(e) => setOrderDetails({...orderDetails, cakeSize: e.target.value})}
                    className="w-full mt-1 p-2 border border-pink-200 rounded-md"
                  >
                    <option value="small">Small (6")</option>
                    <option value="medium">Medium (8")</option>
                    <option value="large">Large (10")</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="message">Custom Message</Label>
                  <Textarea
                    id="message"
                    value={orderDetails.message}
                    onChange={(e) => setOrderDetails({...orderDetails, message: e.target.value})}
                    placeholder="Add a custom message"
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryDate">Delivery Date</Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={orderDetails.deliveryDate}
                    onChange={(e) => setOrderDetails({...orderDetails, deliveryDate: e.target.value})}
                  />
                </div>

                <Button 
                  onClick={handleSubmitOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {loading ? 'Submitting...' : 'Submit Order'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center text-purple-700">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Your Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-purple-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">Order #{order.id}</p>
                          <p className="text-sm text-gray-600">Size: {order.cake_size}</p>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-700">
                          {order.status}
                        </Badge>
                      </div>
                      {order.message && (
                        <p className="text-sm text-gray-600 mb-2">Message: {order.message}</p>
                      )}
                      <p className="text-sm text-gray-500">Delivery: {order.delivery_date}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
