import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cake, Upload, Star, Users } from 'lucide-react';

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onLoginClick, onRegisterClick }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cake className="h-8 w-8 text-pink-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              CakeCanvas
            </h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={onLoginClick} className="border-pink-300 text-pink-600 hover:bg-pink-50">
              Login
            </Button>
            <Button onClick={onRegisterClick} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <Badge className="mb-6 bg-pink-100 text-pink-700 border-pink-200">
            ✨ Custom Cake Printing
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Turn Your Photos Into
            <br />Delicious Memories
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Upload your favorite images and we'll print them on premium cakes with edible ink. Perfect for birthdays, weddings, and special occasions.
          </p>
          <Button size="lg" onClick={onRegisterClick} className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-lg px-8 py-4">
            <Upload className="mr-2 h-5 w-5" />
            Start Creating
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Choose CakeCanvas?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Upload className="h-12 w-12 text-pink-500 mb-4" />
                <CardTitle className="text-pink-700">Easy Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Simply drag and drop your images. We support all major formats and ensure perfect quality.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-purple-500 mb-4" />
                <CardTitle className="text-purple-700">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Food-safe edible ink and premium cake materials ensure your memories taste as good as they look.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="border-indigo-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-indigo-500 mb-4" />
                <CardTitle className="text-indigo-700">Fast Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Quick turnaround times with local delivery options. Your custom cake will be ready when you need it.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;