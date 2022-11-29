const { ClientSession } = require("mongodb");
const ApiError = require("../api-error");
const CustomerService = require("../service/customerService");
const MongoDB = require("../utils/mongodb.util");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }

  try {
    const customerService = new CustomerService(MongoDB.client);
    const document = await customerService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);
    const document = await customerService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
};

exports.findAll = async (req, res, next) => {
  let documents = [];
  try {
    const customerService = new CustomerService(MongoDB.client);
    const { name } = req.query;
    if (name) {
      documents = await customerService.findByName(name);
    } else {
      documents = await customerService.find({});
    }
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while retrieving contacts")
    );
  }
  return res.send(documents);
};

//Update a contact by the id in the request
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const customerService = new CustomerService(MongoDB.client);
    const document = await customerService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);

    const document = await customerService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
};

//Delete all contacts of a user from the database
exports.deleteAll = async (_req, res, next) => {
  try {
    const customerService = new CustomerService(MongoDB.client);

    const deletedCount = await customerService.deleteAll();
    return res.send({
      message: `${deletedCount} contacts were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all contacts")
    );
  }
};
