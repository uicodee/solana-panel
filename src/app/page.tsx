"use client"

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/shared/ui/card";
import {DataTable} from "@/shared/ui/data-table";
import {ColumnDef} from "@tanstack/table-core";
import {Button} from "@/shared/ui/button";
import {Trash} from "lucide-react";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/shared/ui/alert-dialog";
import {CreateAccountButton, CreateAccountModal} from "@/features/create-account";
import {EditAccountButton, EditAccountModal} from "@/features/edit-account";
import {Account} from "@/shared/model/account";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getAddress} from "@/shared/api/generated/address/address.ts";

export default function Home() {
    const queryClient = useQueryClient();
    const {data: accounts, isLoading} = useQuery({
        queryKey: ["accounts"],
        queryFn: () => getAddress().allAddressesAddressAllGet()
    });

    const data = accounts || [];

    const mutation = useMutation({
        mutationFn: (addressId: number) => getAddress().deleteAddressAddressDeleteDelete({addressId}),
        onSuccess: () => {
            void queryClient.invalidateQueries({queryKey: ["accounts"]});
        }
    });

    const columns: ColumnDef<Account>[] = [
        {
            accessorKey: "id",
            header: "ID"
        },
        {
            accessorKey: "title",
            header: "Title"
        },
        {
            accessorKey: "address",
            header: "Address"
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({row}) => (
                <div className="flex gap-x-3">
                    <EditAccountButton account={row.original}/>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <Trash className="size-4"/>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete data and remove this data
                                    from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => mutation.mutate(row.original.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            )
        }
    ];

    return (
        <Card>
            <CreateAccountModal/>
            <EditAccountModal/>
            <div className="flex items-center justify-between">
                <CardHeader className="px-6 pt-6 pb-1">
                    <CardTitle>Accounts</CardTitle>
                    <CardDescription>All available accounts</CardDescription>
                </CardHeader>
                <div className="flex px-6 pt-6 pb-1">
                    <CreateAccountButton/>
                </div>
            </div>
            <CardContent>
                <DataTable
                    columns={columns}
                    data={data}
                    isLoading={isLoading}
                />
            </CardContent>
        </Card>
    );
}
