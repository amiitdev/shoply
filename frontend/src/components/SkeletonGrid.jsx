const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="h-60 bg-gray-800 animate-pulse rounded-xl" />
      ))}
    </div>
  );
};

export default SkeletonGrid;
