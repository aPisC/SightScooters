import { ILandmark } from "common";
import { VStack } from "@chakra-ui/react";
import React from "react";
import LandmarkBox from "./LandmarkBox";
import { useApiCall } from "../../hooks/useApiCall";
import { LandmarkQuery } from "../../queries/landmark.query";
import MapIconButton from "./MapIconButton";
import TicketBuyButton from "./TicketBuyButton";
import TicketOwnedButton from "./TicketOwnedButton";
import CheckableBox from "./CheckableBox";
import ReactTagInput from "@pathofdev/react-tag-input";
import MySpinner from "../MySpinner";

type Props = {
  checkable?: boolean;
  buyable?: boolean;
  landmarks: Array<ILandmark>;
  onCheckedChange?: (landmarkId: string, checked: boolean) => void;
  checkedIds?: string[];
};

export default function LandmarkList({
  checkable = false,
  buyable = false,
  landmarks,
  onCheckedChange,
  checkedIds,
}: Props) {
  const [tags, setTags] = React.useState<Array<string>>([]);
  const api = useApiCall(() => LandmarkQuery.getMyLandmarks());
  if (!api?.value) return <MySpinner />;
  return (
    <>
      <ReactTagInput
        tags={tags}
        onChange={(newTags: Array<string>) => setTags(newTags)}
      />
      <VStack gap={1} padding={2} maxH="100%" w="100%" overflowY="scroll">
        {landmarks.map((landmark, index) => {
          if (tags.find((tag) => landmark.tags.includes(tag))) {
            return (
              <LandmarkBox landmark={landmark} key={index}>
                {checkable && !buyable && (
                  <CheckableBox
                    checked={!!checkedIds?.includes(landmark.id)}
                    onCheckedChange={(checked) =>
                      onCheckedChange?.(landmark.id, checked)
                    }
                  />
                )}
                <MapIconButton
                  address={landmark.address}
                  coordinate={landmark.coordinate}
                />

                {(api.value as ILandmark[])
                  .map((item) => item.id)
                  .includes(landmark.id) ? (
                  <TicketOwnedButton />
                ) : !checkable && buyable ? (
                  <TicketBuyButton
                    landmark={landmark}
                    callback={() => api.execute()}
                  />
                ) : null}
              </LandmarkBox>
            );
          }
          if (tags.length == 0) {
            return (
              <LandmarkBox landmark={landmark} key={index}>
                {checkable && !buyable && (
                  <CheckableBox
                    checked={!!checkedIds?.includes(landmark.id)}
                    onCheckedChange={(checked) =>
                      onCheckedChange?.(landmark.id, checked)
                    }
                  />
                )}
                <MapIconButton
                  address={landmark.address}
                  coordinate={landmark.coordinate}
                />

                {(api.value as ILandmark[])
                  .map((item) => item.id)
                  .includes(landmark.id) ? (
                  <TicketOwnedButton />
                ) : !checkable && buyable ? (
                  <TicketBuyButton
                    landmark={landmark}
                    callback={() => api.execute()}
                  />
                ) : null}
              </LandmarkBox>
            );
          }
        })}
      </VStack>
    </>
  );
}
