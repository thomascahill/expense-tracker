// types.ts
export interface Data {
    description: string;
    amount: number;
    category: string;
    key?: string;      //Optional parameter -> Form.tsx returns shape of only: {description, amount, category}
  }                    // However, Table.tsx filters on shape with the additional "key" parameter that is created and added in the parent App.tsx
  