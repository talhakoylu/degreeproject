import {useTable, useFlexLayout} from "react-table";
import {Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";

export default function CustomTable({data, columns}) {


    const tableInstance = useTable({columns, data}, useFlexLayout)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = tableInstance

    return (
        <Table variant='striped' colorScheme='gray' {...getTableProps()}>
            <Thead>
                {headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                            <Th key={index} {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
                {rows.map((row, index) => {
                    prepareRow(row)
                    return (
                        <Tr key={index} {...row.getRowProps()}>
                            {row.cells.map((cell, index) => {
                                return (
                                    <Td key={index} {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </Td>
                                )
                            })}
                        </Tr>
                    )
                })}
            </Tbody>
            <Tfoot>
                {headerGroups.map((headerGroup, index) => (
                    <Tr key={index} {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column, index) => (
                            <Th key={index} {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Tfoot>
        </Table>
    )


}