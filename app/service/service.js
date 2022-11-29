const { ObjectId } = require("mongodb");

//Tạo lớp dịch vụ để kết nối đến collection products
class ContactService {
  constructor(client) {
    this.contact = client.db().collection("products");
  }
  // ĐỊNH NGHĨA CÁC PHƯƠNG THỨC TRUY XUẤT CSDL SỬ DỤNG MONGODB API
  //Tạo một phương thức tên ContactData với tham số là "coffee" mang ý nghĩa như Schema khi create collections vào CSDL
  ContactData(coffee) {
    const contact = {
      name: coffee.name,
      description: coffee.origin,
      price: coffee.price,
    };
    // Xóa những fields không xác định
    //==> Biến Object thuộc lớp xây dựng ObjectContructor dùng để cung cấp chức năng chung cho tất cả đối tượng JavaScript
    //Objects.key: Trả về tên của vô số thuộc tính chuỗi và phương thức của một đối tượng
    //forEach là một hàm chấp nhận tối đa ba đối số. forEach gọi hàm callbackfn một lần cho mỗi phần tử trong mảng.
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
      //Hàm callback với tham số (key): Với mỗi key trong keys, nếu bằng với không xác định thì xóa!
    );
    return contact;
  }

  async create(coffee) {
    const contact = this.ContactData(coffee);
    const result = await this.contact.findOneAndUpdate(
      contact,
      { $set: {} },
      { returnDocument: "after", upsert: true }
    );
    return result.value;
  }

  async find(filter) {
    const cursor = await this.contact.find(filter);
    return await cursor.toArray();
  }

  //FindOne
  async findById(id) {
    return await this.contact.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  //Update
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractConactData(payload);
    const result = await this.contact.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  //Deleted
  async delete(id) {
    const result = await this.contact.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  //deletedAll
  async deleteAll() {
    const result = await this.contact.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = ContactService;
