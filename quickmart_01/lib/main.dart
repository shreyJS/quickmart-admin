import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:quickmart_01/pages/cart_details.dart';
import 'package:quickmart_01/pages/categories_screen.dart';
import 'package:quickmart_01/pages/home_screen.dart';
import 'package:quickmart_01/pages/orders_screen.dart';
import 'package:quickmart_01/pages/favorite_screen.dart';
import 'package:quickmart_01/providers/cart_provider.dart';
import 'providers/favorite_provider.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [ChangeNotifierProvider(create: (_) => FavoriteProvider()), ChangeNotifierProvider(create: (_) => CartProvider())],
      child: MaterialApp(
        title: 'Quickmart',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
          useMaterial3: true,
        ),
        home: const Home(),
      ),
    );
  }
}

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  int _currentIndex = 0;
  List screens = [
    const HomeScreen(),
    const CategoriesScreen(),
    const OrdersScreen(),
    const FavoriteScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Quickmart"),
        centerTitle: true,
        actions: [
          IconButton(
              onPressed: () => Navigator.push(context,
                  MaterialPageRoute(builder: (context) => const CartDetails())),
              icon: const Icon(Icons.add_shopping_cart))
        ],
      ),
      body: screens[_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (value) {
            setState(() {
              _currentIndex = value;
            });
          },
          showUnselectedLabels: true,
          unselectedItemColor: Colors.grey,
          selectedItemColor: Colors.green,
          items: const [
            BottomNavigationBarItem(
              label: "Home",
              icon: Icon(Icons.home_outlined),
            ),
            BottomNavigationBarItem(
              label: "Categories",
              icon: Icon(Icons.category_outlined),
            ),
            BottomNavigationBarItem(
              label: "Orders",
              icon: Icon(Icons.shopping_basket_outlined),
            ),
            BottomNavigationBarItem(
              label: "Settings",
              icon: Icon(Icons.settings_outlined),
            ),
          ]),
    );
  }
}
