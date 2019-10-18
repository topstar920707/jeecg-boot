package org.jeecg.common.system.vo;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ComboModel implements Serializable {
    private String id;
    private String title;

    public ComboModel(){

    };

    public ComboModel(String id,String title){
        this.id = id;
        this.title = title;
    };
}
