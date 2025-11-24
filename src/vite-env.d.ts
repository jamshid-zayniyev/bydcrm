/// <reference types="vite/client" />

// SVG fayllarni React komponent sifatida import qilish uchun
declare module "*.svg" {
  import * as React from "react";
  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}

// Agar ?url bilan import qilmoqchi bo‘lsangiz (masalan, <img src={...} /> uchun)
declare module "*.svg?url" {
  const src: string;
  export default src;
}
