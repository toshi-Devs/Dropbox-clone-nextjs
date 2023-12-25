"use client"

import { COLOR_EXTENSION_MAP } from "@/constant";
import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import prettyBytes from "pretty-bytes";
import { type DefaultExtensionType, FileIcon, defaultStyles } from "react-file-icon";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<FileType>[] = [

    {
        accessorKey: "type",
        header: "Type",
        cell: ( { renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension: string = type.split("/")[1];
            
            // renderValue is a function that returns the value of the cell.
            return <div className="flex items-center space-x-2 w-12"> 
                    <FileIcon 
                    extension={extension}
                    labelColor={COLOR_EXTENSION_MAP[extension]}
                    
                    {...defaultStyles[extension as DefaultExtensionType]}
                     />
            </div>
        }
    },

  {
    accessorKey: "filename",
    header: "FileName",
  },
  {
    accessorKey: "createdAt",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ( { renderValue, ...props }) => {
        // renderValue is a function that returns the value of the cell.
        return <span>{prettyBytes(renderValue() as number)}</span>
    }
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ( { renderValue, ...props }) => {
        // renderValue is a function that returns the value of the cell.
        return <a 
        href={renderValue() as string} 
        target="_blank" 
        className="underline text-blue-500 hover:text-blue-700"
        >Download</a>
    }
  }
]
