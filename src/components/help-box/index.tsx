import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Owner'];
  const roles = ['Owner', 'Developer', 'Marketer', 'Admin'];
  const applicationName = 'seo-ai';
  const tenantName = 'Pencraft Pro';
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Owner:
1. As an Owner, I want to create a Pencraft Pro account so that I can manage my team and access the AI-powered content optimization platform.
2. As an Owner, I want to invite Developers, Marketers, and Admins to join my Pencraft Pro account so that they can collaborate and contribute to the content optimization process.
3. As an Owner, I want to manage the permissions and roles of my team members so that I can ensure they have the appropriate access to the platform.

Developer:
1. As a Developer, I want to integrate the AI-powered content optimization platform with our existing website, social media, and blog platforms so that we can automatically analyze and optimize our content.
2. As a Developer, I want to access the API documentation and resources so that I can effectively integrate the platform with our existing systems.

Marketer:
1. As a Marketer, I want to input our target keywords and phrases so that the AI-powered content optimization platform can analyze and optimize our content for SEO.
2. As a Marketer, I want to view the AI-generated content suggestions so that I can choose the best options for our website, social media, and blog platforms.
3. As a Marketer, I want to track the performance of our optimized content so that I can measure the impact on user engagement and SEO.

Admin:
1. As an Admin, I want to manage the Pencraft Pro account settings so that I can ensure the platform is configured correctly for our organization.
2. As an Admin, I want to manage the user access and permissions for our Pencraft Pro account so that I can ensure the appropriate team members have access to the platform.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="20px" bottom="20px" zIndex={3}>
      <Popover placement="top">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody maxH="400px" overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application. Feel free to remove this tutorial with the{' '}
              <Box as="span" bg="yellow.300" p={1}>
                NEXT_PUBLIC_SHOW_BRIEFING
              </Box>{' '}
              environment variable.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};
