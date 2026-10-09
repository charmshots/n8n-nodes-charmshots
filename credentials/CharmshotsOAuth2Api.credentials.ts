import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class CharmshotsOAuth2Api implements ICredentialType {
	name = 'charmshotsOAuth2Api';
	displayName = 'Charmshots OAuth2 API';
	documentationUrl = 'https://github.com/charmshots/n8n-nodes-charmshots#authentication';
	icon = { light: 'file:charmshots.svg', dark: 'file:charmshots.svg' } as const;
	extends = ['oAuth2Api'];
	properties: INodeProperties[] = [
		{
			displayName: 'Use Dynamic Client Registration',
			name: 'useDynamicClientRegistration',
			type: 'hidden',
			default: true,
		},
		{
			displayName: 'Server URL',
			name: 'serverUrl',
			type: 'hidden',
			default: 'https://charmshots.com/v1',
		},
		{
			displayName: 'Resource URL',
			name: 'resourceUrl',
			type: 'hidden',
			default: 'https://charmshots.com/v1',
		},
	];
}
