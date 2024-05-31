import codegen from '@cosmwasm/ts-codegen';

codegen({
  contracts: [
    {
      name: 'JMarketplace',
      dir: '../contracts/auction/schema'
    }
  ],
  outPath: '../../JunoMarketplace/contracts/JMarketplace',
  // options are completely optional ;)
  options: {
    bundle: {
      bundleFile: 'index.ts',
      scope: 'contracts'
    },
    types: {
      enabled: true
    },
    client: {
      enabled: true
    },
    reactQuery: {
      enabled: true,
      optionalClient: true,
      version: 'v4',
      mutations: true,
      queryKeys: true,
      queryFactory: true,
    },
    recoil: {
      enabled: false
    },
    messageComposer: {
      enabled: true
    },
    messageBuilder: {
      enabled: true
    },
    useContractsHook: {
      enabled: true
    }
  }
}).then(() => {
  console.log('✨ all done!');
});