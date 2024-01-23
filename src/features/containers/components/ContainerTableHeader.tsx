function ContainerTableHeader() {
  return (
    <div
      className="grid grid-cols-6 gap-12 border-b border-gray-100 bg-gray-50 px-3 py-4 font-semibold text-gray-600"
      role="row"
    >
      <div></div>
      <div>Container</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>
    </div>
  );
}

export default ContainerTableHeader;
