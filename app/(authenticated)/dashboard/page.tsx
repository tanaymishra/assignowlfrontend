export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {[...new Array(4)].map((_, idx) => (
          <div
            key={"dashboard-card-" + idx}
            className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
          ></div>
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        {[...new Array(2)].map((_, idx) => (
          <div
            key={"dashboard-main-" + idx}
            className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"
          ></div>
        ))}
      </div>
    </div>
  )
}