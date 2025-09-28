const employees = [
  { name: "Alice", id: "E101" },
  { name: "Bob", id: "E102" },
  { name: "Charlie", id: "E103" },
];

function listEmployees() {
  if (employees.length === 0) {
    console.log("No employees found.");
    return;
  }
  console.log("\nEmployee List:");
  employees.forEach((emp, index) => {
    console.log(`${index + 1}. Name: ${emp.name}, ID: ${emp.id}`);
  });
}

function addEmployee(name, id) {
  employees.push({ name, id });
  console.log(`Employee ${name} (ID: ${id}) added successfully.`);
}

function removeEmployee(id) {
  const index = employees.findIndex((emp) => emp.id === id);
  if (index !== -1) {
    const removed = employees.splice(index, 1)[0];
    console.log(
      `Employee ${removed.name} (ID: ${removed.id}) removed successfully.`
    );
  } else {
    console.log(`No employee found with ID: ${id}`);
  }
}

module.exports = {
  listEmployees,
  addEmployee,
  removeEmployee,
};
