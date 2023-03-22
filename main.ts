import { Construct } from "constructs";
import { App, TerraformStack } from "cdktf";

import { GoogleProvider } from "@cdktf/provider-google/lib/provider";
import { StorageBucket } from "@cdktf/provider-google/lib/storage-bucket";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    // define resources here
    new GoogleProvider(this, "GoogleProvider", {
      project: "discord-voiceassistant",
      region: "us-central1"
    });

    new StorageBucket(this, "TestBucket", {
      name: "test-bucket-discord-voiceassistant",
      location: "US",
      labels: {
        "test_label": "test_value"
      }
    });
  }
}

const app = new App();
new MyStack(app, "DiscordVoiceAssistantInfraStack");
app.synth();
