import React, { forwardRef } from 'react';
import styles from './Table.module.css';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, containerClassName, children, ...props }, ref) => {
    return (
      <div className={`${styles.container} ${containerClassName || ''}`}>
        <table
          ref={ref}
          className={`${styles.table} ${className || ''}`}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);
Table.displayName = 'Table';

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={`${styles.header} ${className || ''}`} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={className} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = 'TableBody';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  isHoverable?: boolean;
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ isHoverable = true, className, children, ...props }, ref) => (
    <tr
      ref={ref}
      className={`${styles.row} ${isHoverable ? styles.hoverable : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </tr>
  )
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ align = 'left', className, children, ...props }, ref) => (
    <th
      ref={ref}
      className={`${styles.headCell} ${styles[`align-${align}`]} ${className || ''}`}
      {...props}
    >
      {children}
    </th>
  )
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
  isNumeric?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    { align = 'left', isNumeric = false, className, children, ...props },
    ref
  ) => (
    <td
      ref={ref}
      className={`${styles.cell} ${styles[`align-${align}`]} ${isNumeric ? styles.tabularNums : ''} ${className || ''}`}
      {...props}
    >
      {children}
    </td>
  )
);
TableCell.displayName = 'TableCell';
