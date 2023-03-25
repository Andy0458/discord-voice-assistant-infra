import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { CloudfunctionsFunction } from "@cdktf/provider-google/lib/cloudfunctions-function";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new GoogleProvider(this, "GoogleProvider", {
      project: "discord-voiceassistant",
      region: "us-central1"
    });

    new CloudfunctionsFunction(this, "cloudFunction", {
      name: "discord-interactions",
      runtime: "go120",
      triggerHttp: true,
      httpsTriggerSecurityLevel: "SECURE_ALWAYS",
      sourceRepository: {
        url: "https://source.developers.google.com/projects/discord-voiceassistant/repos/discord-voice-assistant/moveable-aliases/main/paths/"
      },
      entryPoint: "HelloHTTP"
    });
  }
}

const app = new App();
new MyStack(app, "DiscordVoiceAssistantInfraStack");
app.synth();
