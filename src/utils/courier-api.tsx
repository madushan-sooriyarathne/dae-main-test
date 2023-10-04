import { courierClient } from "@lib/courier";

import type { RouterInputs } from "@utils/api";

type ContactNotificationInput = RouterInputs["contact"]["contactInquiry"];
export const sendContactNotification = async (
  data: ContactNotificationInput
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: { email: "info@dae.fun" },
        template: "JZ6SS7RBQAMXCTPFCNG80ZA9WZ6E",
        data: data,
      },
    });

    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (error: unknown) {
    return null;
  }
};

type EventNotificationInput = RouterInputs["inquiries"]["eventsInquiry"];
export const sendEventsNotification = async (
  data: EventNotificationInput
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: { email: "info@dae.fun" },
        template: "N5JM2BNNW7M7E1KEHPW1Z0G767W5",
        data: data,
      },
    });
    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (err: unknown) {
    return null;
  }
};

type OfferNotificationInput = RouterInputs["inquiries"]["offerInquiry"];
export const sendOfferNotification = async (
  data: OfferNotificationInput
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: { email: "info@dae.fun" },
        template: "8HWK3C87TXMKHEJXV833WX37N88X",
        data: data,
      },
    });

    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (err: unknown) {
    return null;
  }
};

type TrainingCourseNotificationInput =
  RouterInputs["inquiries"]["trainingCenterInquiry"];
export const sendTrainingCourseNotification = async (
  data: TrainingCourseNotificationInput
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: { email: "info@dae.fun" },
        template: "WCD69YMND442MNKJVT429K34XFDZ",
        data: data,
      },
    });

    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (err: unknown) {
    return null;
  }
};

type AcknowledgementData = {
  name: string;
  email: string;
  company: string;
};

export const sendCustomerAcknowledgement = async (
  data: AcknowledgementData
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: {
          email: data.email,
        },
        template: "CDSGD6QC6W4VKNQ8TCFP11JQYECR",
        data: data,
      },
    });

    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (error: unknown) {
    return null;
  }
};

// type JobApplicationNotificationInput =
//   RouterInputs["jobApplication"]["application"];
type JobApplicationNotificationInput = {
  name: string;
  email: string;
  contact: string;
  position: string;
  coverLetter: EncodedFile | null;
  resume: EncodedFile;
};
export const sendJobApplicationNotification = async (
  data: JobApplicationNotificationInput
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: { email: "info@dae.fun" },
        template: "CRRGCQ89GH4XK4KC0YBN4YE6M8GD",
        data: {
          name: data.name,
          email: data.email,
          contact: data.contact,
          position: data.position,
        },
        providers: {
          "aws-ses": {
            override: {
              attachments: [data.resume, data.coverLetter],
            },
          },
        },
      },
    });

    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

type MembershipNotificationInput = RouterInputs["membership"]["apply"];
export const sendMembershipNotification = async (
  data: MembershipNotificationInput
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: { email: "info@dae.fun" },
        template: "XNPDF5ZRKJ40R9GR3XTWSTJQE03C",
        data: {
          ...data,
          haveWatercraft: data.ownsAWatercraft ? "Yes" : "No",
        },
      },
    });
    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (err: unknown) {
    return null;
  }
};

type JobApplicationAcknowledgementData = {
  name: string;
  email: string;
  position: string;
};
export const sendJobApplicationAcknowledgement = async (
  data: JobApplicationAcknowledgementData
): Promise<string | null> => {
  try {
    const { requestId } = await courierClient.send({
      message: {
        to: {
          email: data.email,
        },
        template: "RKDZX496BKMX4NPGGS8438W4DD2V",
        data: data,
      },
    });

    if (requestId) {
      return requestId;
    } else {
      return null;
    }
  } catch (error: unknown) {
    return null;
  }
};
