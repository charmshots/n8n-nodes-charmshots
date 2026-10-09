import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';
import { executeOperations, type Operation, type ResourceRoute } from './transport';
import operations from './operations.json';
import routes from './routes.json';

export class Charmshots implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Charmshots',
		name: 'charmshots',
		icon: { light: 'file:charmshots.svg', dark: 'file:charmshots.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		description: 'Automate your Charmshots account',
		defaults: { name: 'Charmshots' },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: 'charmshotsOAuth2Api', required: true }],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Photoshoot',
						value: 'photoshoots',
					},
				],
				default: 'account',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Profile',
						value: 'get_profile',
						description:
							"Read the signed-in customer's own Charmshots account profile. Does not search for or identify other people.",
						action: 'Get profile in charmshots',
					},
				],
				default: 'get_profile',
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Photoshoot',
						value: 'get_photoshoot',
						description:
							'Read an existing owned photoshoot. Use list_photos to browse its finished images.',
						action: 'Get photoshoot in charmshots',
					},
					{
						name: 'List Photos',
						value: 'list_photos',
						description:
							'List existing photo metadata and owner-authenticated download links. Links require product sign-in; they are not public share links. Does not generate or analyse images',
						action: 'List photos in charmshots',
					},
					{
						name: 'List Photoshoots',
						value: 'list_photoshoots',
						description:
							'Browse your existing photoshoots, newest first. Empty results mean no shoots have been created in this account.',
						action: 'List photoshoots in charmshots',
					},
				],
				default: 'get_photoshoot',
				displayOptions: {
					show: {
						resource: ['photoshoots'],
					},
				},
			},
			{
				displayName: 'Photoshoot ID',
				name: 'get_photoshoot__photoshootId',
				type: 'string',
				default: '',
				required: true,
				description: 'The photoshoot ID for this operation',
				displayOptions: {
					show: {
						operation: ['get_photoshoot'],
						resource: ['photoshoots'],
					},
				},
			},
			{
				displayName: 'Photoshoot ID',
				name: 'list_photos__photoshootId',
				type: 'string',
				default: '',
				required: true,
				description: 'The photoshoot ID for this operation',
				displayOptions: {
					show: {
						operation: ['list_photos'],
						resource: ['photoshoots'],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'options_list_photos',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['list_photos'],
						resource: ['photoshoots'],
					},
				},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The offset for this operation',
						typeOptions: {
							minValue: 0,
							maxValue: 10000,
							numberPrecision: 0,
						},
					},
				],
			},
			{
				displayName: 'Additional Fields',
				name: 'options_list_photoshoots',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						operation: ['list_photoshoots'],
						resource: ['photoshoots'],
					},
				},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'The offset for this operation',
						typeOptions: {
							minValue: 0,
							maxValue: 10000,
							numberPrecision: 0,
						},
					},
				],
			},
		],
	};
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		return executeOperations(
			this,
			'https://charmshots.com',
			'charmshotsOAuth2Api',
			operations as unknown as Operation[],
			routes as Record<string, ResourceRoute>,
		);
	}
}
