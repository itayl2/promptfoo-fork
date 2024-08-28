import dedent from 'dedent';
import logger from '../../logger';
import type { ApiProvider } from '../../types';

export async function callExtraction(provider: ApiProvider, prompt: string): Promise<string> {
  const { output, error } = await provider.callApi(prompt);

  if (error) {
    logger.error(`Error in extraction: ${error}`);
    throw new Error(`Failed to perform extraction: ${error}`);
  }

  if (typeof output !== 'string') {
    logger.error(`Invalid output from extraction. Got: ${output}`);
    throw new Error(`Invalid extraction output: expected string, got: ${output}`);
  }

  return output;
}

export function formatPrompts(prompts: string[]): string {
  return prompts
    .map(
      (prompt) => dedent`
    <Prompt>
    ${prompt}
    </Prompt>`,
    )
    .join('\n');
}
