function MainLogo() {
  return (
    <div className="flex flex-col items-center justify-start gap-1">
      <img
        className="h-32 w-auto"
        src="/hotel-logo.png"
        alt="The Snowflake Logo"
      />
      <h1 className="text-xl text-gray-600">The Snowflake</h1>
    </div>
  );
}

export default MainLogo;
