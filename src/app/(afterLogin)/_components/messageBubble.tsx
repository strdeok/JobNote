export default function MessageBubble({ children }: { children: string }) {
  return (
    <div
      className="
        absolute
        w-max             
        whitespace-nowrap 
        p-2
        shadow-xl
        bg-[#ffe8cc]
        rounded-md
        -top-12       
        -left-1
        after:content-['']
        after:absolute
        after:top-full
        after:left-4
        after:-translate-x-1/2
        after:w-0 after:h-0
        after:border-[6px]
        after:border-transparent
        after:border-t-[#ffe8cc]
      "
    >
      {children}
    </div>
  );
}
