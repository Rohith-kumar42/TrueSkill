import { cn } from "@/lib/utils";
import type { PieceName } from "@/lib/data";

type ChessPieceProps = {
  piece: PieceName;
  className?: string;
  title?: string;
};

const paths: Record<PieceName, string[]> = {
  king: [
    "M49 13h14v11h11v14H63v12h21l-6 12H34l-6-12h21V38H38V24h11V13Z",
    "M32 78h48l7 13H25l7-13Z",
    "M24 96h64v13H24V96Z"
  ],
  queen: [
    "M24 32l13 20 14-27 13 27 14-20 7 37H17l7-37Z",
    "M25 75h62l-7 15H32l-7-15Z",
    "M28 96h56v13H28V96Z"
  ],
  rook: [
    "M25 20h14v11h10V20h14v11h10V20h14v30H25V20Z",
    "M32 56h48v28H32V56Z",
    "M24 91h64v18H24V91Z"
  ],
  bishop: [
    "M56 14c15 12 22 25 22 40 0 15-10 27-22 27S34 69 34 54c0-15 7-28 22-40Z",
    "M48 45l20-15-13 30h-8l1-15Z",
    "M31 91h50l7 18H24l7-18Z"
  ],
  knight: [
    "M34 88c9-26 6-44 28-63l25 24-8 11-14-8-9 10h21c1 14-8 24-24 35h-19Z",
    "M44 31l-19 9 16-21 20 6-17 6Z",
    "M26 96h58v13H26V96Z"
  ],
  pawn: [
    "M56 19a17 17 0 1 1 0 34 17 17 0 0 1 0-34Z",
    "M42 58h28l7 28H35l7-28Z",
    "M27 94h58v15H27V94Z"
  ]
};

export function ChessPiece({ piece, className, title }: ChessPieceProps) {
  const readable = title ?? piece[0].toUpperCase() + piece.slice(1);

  return (
    <svg
      viewBox="0 0 112 128"
      role="img"
      aria-label={`${readable} chess piece`}
      className={cn("h-16 w-16 fill-current", className)}
    >
      <title>{readable}</title>
      {paths[piece].map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
