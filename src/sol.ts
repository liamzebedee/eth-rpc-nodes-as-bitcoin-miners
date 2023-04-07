// 
// Tools for compiling Solidity contracts.
// 
const solc = require('solc')

const solcInput = (contractName: string, content: string) => ({
    language: 'Solidity',
    sources: {
        [contractName]: {
            content: content
        },
    },
    settings: {
        optimizer: {
            enabled: false,
            runs: 200,
        },
        evmVersion: 'petersburg',
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
})

export function compileSolidity(contractName: string, content: string) {
    const input = solcInput(contractName, content)
    const output = JSON.parse(solc.compile(JSON.stringify(input)))

    let compilationFailed = false

    if (output.errors) {
        for (const error of output.errors) {
            if (error.severity === 'error') {
                console.error(error.formattedMessage)
                compilationFailed = true
            } else {
                console.warn(error.formattedMessage)
            }
        }
    }

    if (compilationFailed) {
        return undefined
    }

    return output
}