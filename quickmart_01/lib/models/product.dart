class Product {
  final int id;
  final String name;
  final double costPrice;
  final String description;
  final String category;
  final String image;
  int quantity;
  final String brand;
  final double sellingPrice;
  final double labelPrice;

  Product({
    required this.id,
    required this.name,
    required this.costPrice,
    required this.description,
    required this.category,
    required this.image,
    required this.quantity,
    required this.brand,
    required this.sellingPrice,
    required this.labelPrice,
  });
}
