import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Link } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getPencraftPros, deletePencraftProById } from 'apiSdk/pencraft-pros';
import { PencraftProInterface } from 'interfaces/pencraft-pro';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function PencraftProListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<PencraftProInterface[]>(
    () => '/pencraft-pros',
    () =>
      getPencraftPros({
        relations: ['user', 'content_suggestion.count', 'integration.count', 'keyword.count', 'performance.count'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deletePencraftProById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Pencraft Pro
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('pencraft_pro', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Link href={`/pencraft-pros/create`}>
            <Button colorScheme="blue" mr="4">
              Create
            </Button>
          </Link>
        )}
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>name</Th>
                  <Th>created_at</Th>
                  <Th>updated_at</Th>
                  {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>user</Th>}
                  {hasAccess('content_suggestion', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>content_suggestion</Th>
                  )}
                  {hasAccess('integration', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>integration</Th>
                  )}
                  {hasAccess('keyword', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>keyword</Th>}
                  {hasAccess('performance', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>performance</Th>
                  )}
                  {hasAccess('pencraft_pro', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && <Th>Edit</Th>}
                  {hasAccess('pencraft_pro', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>View</Th>}
                  {hasAccess('pencraft_pro', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && <Th>Delete</Th>}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    <Td>{record.name}</Td>
                    <Td>{record.created_at as unknown as string}</Td>
                    <Td>{record.updated_at as unknown as string}</Td>
                    {hasAccess('user', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/users/view/${record.user?.id}`}>
                          {record.user?.email}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('content_suggestion', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.content_suggestion}</Td>
                    )}
                    {hasAccess('integration', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.integration}</Td>
                    )}
                    {hasAccess('keyword', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.keyword}</Td>
                    )}
                    {hasAccess('performance', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>{record?._count?.performance}</Td>
                    )}
                    {hasAccess('pencraft_pro', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/pencraft-pros/edit/${record.id}`} passHref legacyBehavior>
                          <Button as="a">Edit</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('pencraft_pro', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/pencraft-pros/view/${record.id}`} passHref legacyBehavior>
                          <Button as="a">View</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('pencraft_pro', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'pencraft_pro',
  operation: AccessOperationEnum.READ,
})(PencraftProListPage);
